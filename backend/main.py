from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


class Node(BaseModel):
    id: str
    type: str | None = None
    model_config = {"extra": "allow"}


class Edge(BaseModel):
    id: str | None = None
    source: str
    target: str
    model_config = {"extra": "allow"}


class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]] = []
    edges: List[Dict[str, Any]] = []


def is_directed_acyclic_graph(node_ids: List[str], edges: List[Edge]) -> bool:
    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    for edge in edges:
        if edge.source in adjacency and edge.target in adjacency:
            adjacency[edge.source].append(edge.target)

    UNVISITED, IN_PROGRESS, DONE = 0, 1, 2
    state = {node_id: UNVISITED for node_id in node_ids}

    def has_cycle_from(start: str) -> bool:
        stack = [(start, iter(adjacency[start]))]
        state[start] = IN_PROGRESS

        while stack:
            node, neighbors = stack[-1]
            advanced = False
            for neighbor in neighbors:
                if state[neighbor] == IN_PROGRESS:
                    return True
                if state[neighbor] == UNVISITED:
                    state[neighbor] = IN_PROGRESS
                    stack.append((neighbor, iter(adjacency[neighbor])))
                    advanced = True
                    break
            if not advanced:
                state[node] = DONE
                stack.pop()

        return False

    for node_id in node_ids:
        if state[node_id] == UNVISITED:
            if has_cycle_from(node_id):
                return False

    return True


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    nodes = pipeline.nodes
    edges = [Edge(**edge) for edge in pipeline.edges]
    node_ids = [nid for node in nodes if (nid := node.get("id")) is not None]

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_directed_acyclic_graph(node_ids, edges),
    }
