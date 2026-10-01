'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type RouteNode = {
  id: string;
  label: string;
  position: [number, number, number];
};

type RouteEdge = readonly [string, string];

const ROUTE_NODES: RouteNode[] = [
  { id: 'gate', label: 'Main Gate', position: [-3.2, -1.45, 0] },
  { id: 'plaza', label: 'Central Plaza', position: [-1.35, -1.25, 0] },
  { id: 'library', label: 'Library', position: [-2.15, 0.65, 0] },
  { id: 'lab', label: 'Engineering Lab', position: [0.45, 0.95, 0] },
  { id: 'admin', label: 'Admin Hall', position: [2.75, 1.35, 0] },
  { id: 'gym', label: 'Gymnasium', position: [2.75, -1.25, 0] },
  { id: 'garden', label: 'South Garden', position: [0.7, -1.85, 0] },
  { id: 'north', label: 'North Wing', position: [-3.05, 1.55, 0] },
];

const ROUTE_EDGES: RouteEdge[] = [
  ['gate', 'plaza'],
  ['gate', 'library'],
  ['library', 'north'],
  ['library', 'lab'],
  ['north', 'lab'],
  ['plaza', 'library'],
  ['plaza', 'garden'],
  ['plaza', 'lab'],
  ['lab', 'admin'],
  ['lab', 'garden'],
  ['garden', 'gym'],
  ['admin', 'gym'],
];

function distanceBetween(a: RouteNode, b: RouteNode) {
  return Math.hypot(a.position[0] - b.position[0], a.position[1] - b.position[1]);
}

function findShortestPath(startId: string, goalId: string): string[] {
  if (startId === goalId) return [startId];

  const nodeById = new Map(ROUTE_NODES.map((node) => [node.id, node]));
  const neighbors = new Map<string, Array<{ id: string; weight: number }>>();

  ROUTE_NODES.forEach((node) => neighbors.set(node.id, []));
  ROUTE_EDGES.forEach(([from, to]) => {
    const fromNode = nodeById.get(from);
    const toNode = nodeById.get(to);
    if (!fromNode || !toNode) return;
    const weight = distanceBetween(fromNode, toNode);
    neighbors.get(from)?.push({ id: to, weight });
    neighbors.get(to)?.push({ id: from, weight });
  });

  const distances = new Map(ROUTE_NODES.map((node) => [node.id, Number.POSITIVE_INFINITY]));
  const previous = new Map<string, string | undefined>();
  const unvisited = new Set(ROUTE_NODES.map((node) => node.id));
  distances.set(startId, 0);

  while (unvisited.size > 0) {
    const current = [...unvisited].reduce((best, id) => (
      (distances.get(id) ?? Infinity) < (distances.get(best) ?? Infinity) ? id : best
    ));

    unvisited.delete(current);
    if (current === goalId || distances.get(current) === Infinity) break;

    neighbors.get(current)?.forEach(({ id, weight }) => {
      if (!unvisited.has(id)) return;
      const candidate = (distances.get(current) ?? Infinity) + weight;
      if (candidate < (distances.get(id) ?? Infinity)) {
        distances.set(id, candidate);
        previous.set(id, current);
      }
    });
  }

  if (!previous.has(goalId)) return [];

  const path = [goalId];
  let cursor = goalId;
  while (previous.has(cursor)) {
    cursor = previous.get(cursor) as string;
    path.unshift(cursor);
  }
  return path;
}

function checkWebGL() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function SceneRig({ children, prefersReducedMotion }: { children: React.ReactNode; prefersReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    if (prefersReducedMotion) {
      groupRef.current.rotation.set(0, 0, 0);
      return;
    }
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.025, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.02, 0.08);
  });

  return <group ref={groupRef}>{children}</group>;
}

interface RouteSceneProps {
  startId: string;
  goalId: string;
  path: string[];
  onNodeClick: (nodeId: string) => void;
  prefersReducedMotion: boolean;
}

function RouteScene({ startId, goalId, path, onNodeClick, prefersReducedMotion }: RouteSceneProps) {
  const nodeById = useMemo(() => new Map(ROUTE_NODES.map((node) => [node.id, node])), []);
  const edgePositions = useMemo(() => {
    const positions: number[] = [];
    ROUTE_EDGES.forEach(([from, to]) => {
      const fromNode = nodeById.get(from);
      const toNode = nodeById.get(to);
      if (!fromNode || !toNode) return;
      positions.push(...fromNode.position, ...toNode.position);
    });
    return new Float32Array(positions);
  }, [nodeById]);
  const pathPositions = useMemo(() => {
    const positions: number[] = [];
    for (let index = 0; index < path.length - 1; index += 1) {
      const from = nodeById.get(path[index]);
      const to = nodeById.get(path[index + 1]);
      if (!from || !to) continue;
      positions.push(...from.position, ...to.position);
    }
    return new Float32Array(positions);
  }, [nodeById, path]);

  return (
    <>
      <SceneRig prefersReducedMotion={prefersReducedMotion}>
        <ambientLight intensity={1.4} />
        <mesh position={[0, 0, -0.08]}>
          <planeGeometry args={[7.6, 4.6]} />
          <meshBasicMaterial color="#151a13" />
        </mesh>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#83907c" transparent opacity={0.34} />
        </lineSegments>

        {pathPositions.length > 0 && (
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pathPositions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#67d8ff" linewidth={2} />
          </lineSegments>
        )}

        {ROUTE_NODES.map((node) => {
          const isSelected = node.id === startId || node.id === goalId;
          return (
            <mesh
              key={node.id}
              position={node.position}
              onClick={(event) => {
                event.stopPropagation();
                onNodeClick(node.id);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.16 : 0.11, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#67d8ff' : '#e8f1ff'} />
            </mesh>
          );
        })}
      </SceneRig>
    </>
  );
}

function RouteList({ path }: { path: string[] }) {
  const nodeById = new Map(ROUTE_NODES.map((node) => [node.id, node]));

  return (
    <ol className="space-y-2" aria-label="Calculated route">
      {path.map((nodeId, index) => (
        <li key={nodeId} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] text-xs font-semibold text-[var(--accent)]">
            {index + 1}
          </span>
          <span>{nodeById.get(nodeId)?.label ?? nodeId}</span>
        </li>
      ))}
    </ol>
  );
}

export const PathfindingLab = memo(function PathfindingLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [startId, setStartId] = useState('gate');
  const [goalId, setGoalId] = useState('admin');
  const [hasWebGL] = useState(checkWebGL);
  const [isInView, setIsInView] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const path = useMemo(() => findShortestPath(startId, goalId), [startId, goalId]);
  const nodeById = useMemo(() => new Map(ROUTE_NODES.map((node) => [node.id, node])), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: '160px 0px',
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = (nodeId: string) => {
    if (nodeId === startId) return;
    setGoalId(nodeId);
  };

  return (
    <section ref={sectionRef} aria-labelledby="pathfinding-lab-title" className="surface-panel min-w-0 overflow-hidden">
      <div className="grid min-w-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-w-0 min-h-[340px] border-b border-[var(--line)] bg-[#10140f] lg:border-b-0 lg:border-r">
          {hasWebGL ? (
            <Canvas
              camera={{ position: [0, 0, 8], fov: 42 }}
              dpr={[1, 1.35]}
              frameloop={isInView ? 'demand' : 'never'}
              gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
              style={{ width: '100%' }}
              onPointerMove={(event) => event.stopPropagation()}
              aria-hidden="true"
            >
              <RouteScene
                startId={startId}
                goalId={goalId}
                path={path}
                onNodeClick={handleNodeClick}
                prefersReducedMotion={prefersReducedMotion}
              />
            </Canvas>
          ) : (
            <div className="flex h-full min-h-[340px] items-center justify-center p-8">
              <div className="max-w-xs">
                <p className="section-kicker mb-4">WebGL unavailable</p>
                <RouteList path={path} />
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute left-5 top-5 font-mono text-[0.66rem] tracking-[0.12em] text-[var(--muted)]">
            CAMPUS ROUTE / CONCEPT DEMO
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-7 p-6 sm:p-8">
          <div>
            <p className="section-kicker mb-3">Three.js / Campus Navigator</p>
            <h2 id="pathfinding-lab-title" className="font-display text-3xl leading-none text-[var(--foreground)] sm:text-4xl">
              Find a route through the system.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Interactive concept demo inspired by the Go service in Campus Navigator CS312. Choose two points to inspect a deterministic Dijkstra route.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <label className="grid gap-2 font-mono text-[0.68rem] tracking-[0.08em] text-[var(--muted)]">
                From
                <select
                  value={startId}
                  onChange={(event) => setStartId(event.target.value)}
                  className="min-h-11 w-full min-w-0 border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 text-base tracking-normal text-[var(--foreground)]"
                >
                  {ROUTE_NODES.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}
                </select>
              </label>
              <label className="grid gap-2 font-mono text-[0.68rem] tracking-[0.08em] text-[var(--muted)]">
                To
                <select
                  value={goalId}
                  onChange={(event) => setGoalId(event.target.value)}
                  className="min-h-11 w-full min-w-0 border border-[var(--line-strong)] bg-[var(--surface-raised)] px-3 text-base tracking-normal text-[var(--foreground)]"
                >
                  {ROUTE_NODES.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}
                </select>
              </label>
            </div>

            <div aria-live="polite" className="border-t border-[var(--line)] pt-4">
              {path.length > 0 ? (
                <>
                  <p className="mb-3 font-mono text-[0.68rem] tracking-[0.08em] text-[var(--accent)]">
                    ROUTE FOUND / {path.length - 1} SEGMENTS
                  </p>
                  <RouteList path={path} />
                </>
              ) : (
                <p className="text-sm text-[var(--danger)]">No route found between these points.</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 font-mono text-[0.68rem] text-[var(--muted)]">
            <span>Click a node to set destination</span>
            <a
              href="https://github.com/narcisoJavier/WebDev_Campus-Navigator_CS312"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent)]"
            >
              View project
            </a>
          </div>
        </div>
      </div>
      <span className="sr-only">Current destination: {nodeById.get(goalId)?.label}. Current start: {nodeById.get(startId)?.label}.</span>
    </section>
  );
});

export default PathfindingLab;
