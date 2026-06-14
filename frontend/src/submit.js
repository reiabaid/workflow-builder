import React, { useState } from 'react';
import { useStore } from './store';
import './submit.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const ResultModal = ({ result, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <span className="modal-title">Pipeline Analysis</span>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-value">{result.num_nodes}</span>
            <span className="modal-stat-label">Nodes</span>
          </div>
          <div className="modal-stat-divider" />
          <div className="modal-stat">
            <span className="modal-stat-value">{result.num_edges}</span>
            <span className="modal-stat-label">Edges</span>
          </div>
        </div>
        <div className={`modal-dag-badge ${result.is_dag ? 'dag-valid' : 'dag-invalid'}`}>
          {result.is_dag
            ? '✓ Valid DAG — pipeline can execute'
            : '✗ Cycle detected — pipeline cannot execute'}
        </div>
        {result.num_edges === 0 && result.num_nodes > 0 && (
          <div className="modal-warning">
            No edges — nodes are not connected
          </div>
        )}
      </div>
    </div>
  </div>
);

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setError('Add at least one node before submitting.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setResult(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-bar">
        {error && <span className="submit-error">{error}</span>}
        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyzing…' : 'Submit Pipeline'}
        </button>
      </div>
      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
    </>
  );
};
