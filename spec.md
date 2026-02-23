# 🛰 OpenClaw Mission Control Board
## Product Specification (spec.md)

---

# 1. Overview

Build a **Mission Control Board** inside OpenClaw that acts as a single-pane-of-glass for AI orchestration.

The system must allow operators to:

- Create and manage multiple AI Agents
- Assign reusable Profiles to agents
- Assign a model per agent (overriding profile defaults if needed)
- Manage work via a Jira-like Kanban board
- View real-time agent status and execution state
- Track ETA and progress per task/run
- Monitor token cost (Today + Total) in a persistent top-right HUD
- Perform global search across tasks, runs, logs, jobs, artifacts, and memory

This system must be production-ready, real-time, and workspace-aware.

---

# 2. Global Layout

## Top Navigation Bar

**Left**
- "Mission Control"
- Workspace selector (if multi-tenant)

**Center**
- Global Search Bar  
  Placeholder:
  `Search tasks, agents, runs, logs, memory...`

Supported query filters:

```
agent:Gumbo
status:running
model:claude-sonnet-4.5
type:task|run|memory|log
tag:finance
date:today
```

**Right (Persistent Cost HUD)**

Display:

```
Today: $X.XX
Total: $Y.YY
```

Clicking opens a breakdown modal:
- Cost by Agent
- Cost by Model
- Cost by Task
- Burn rate (cost/hour)
- Budget alert thresholds (50%, 80%, 100%)

---

# 3. Agents Module

## 3.1 Agent Card View

Each agent displayed as a card with:

- Avatar
- Name
- Role label
- Status indicator:
  - 🟢 Idle
  - 🔵 Running
  - 🟡 Waiting
  - 🔴 Failed
  - ⚫ Offline
- Assigned Model
- Assigned Profile
- Current Task (if running)

Example:

```
Gumbo
Assistant
Status: Idle
Model: claude-sonnet-4.5
Profile: Ops Assistant
```

---

## 3.2 Agent Configuration Schema

Each agent must include:

- id (uuid)
- name
- description
- avatar
- profile_id
- model (required)
- tool_permissions
- concurrency_limit
- max_tokens_per_run
- timeout_seconds
- budget_limit_usd
- cost_attribution_tag
- status
- created_at
- updated_at

---

# 4. Profiles (Reusable Templates)

Profiles define default behavior:

- id
- name
- system_prompt
- default_model
- tool_permissions
- memory_policy (workspace_scoped | agent_scoped | restricted)
- token_limit
- timeout_limit
- retry_policy

Agents may override default_model.

---

# 5. Kanban Board

## 5.1 Default Columns

- Scheduled
- Ready
- Queue
- In Progress
- Review
- Blocked
- Done

Columns must be configurable.

---

## 5.2 Task Card Requirements

Each task card must display:

- title
- assigned_agent
- priority
- scheduled_time (optional)
- progress_percent (0–100)
- ETA (minutes)
- last_updated
- cost_so_far_usd

Example:

```
Daily synthesis
Agent: Gumbo
ETA: 12m
Progress: 65%
Scheduled: Fri 2/13 7pm
```

---

# 6. Kanban Bot

Include an AI Kanban Bot capable of:

- Creating tasks
- Moving tasks between columns
- Assigning agents
- Detecting blocked tasks
- Requesting live status updates
- Summarizing board state
- Suggesting next actions

Example commands:

```
Move Daily synthesis to Review
Assign Budget check to Bernard
What is blocked?
Summarize workload
```

---

# 7. Execution Model

## Agent Status

- idle
- running
- waiting
- failed
- offline

## Task Status

- scheduled
- ready
- queue
- in_progress
- review
- blocked
- done

## Run Status

- queued
- executing
- completed
- failed
- retrying
- cancelled

---

# 8. ETA & Progress Calculation

ETA must be calculated using:

1. Historical task duration by agent + model
2. Token throughput rate
3. Tool latency
4. Queue wait time
5. Step completion ratio

Each ETA must include a confidence indicator:

- high
- medium
- low

If insufficient data:

```
Estimating...
```

---

# 9. Cost Tracking System

Cost must be computed using:

- input_tokens × model_input_rate
- output_tokens × model_output_rate
- tool usage cost

Cost must be recorded per:

- run
- task
- agent
- model
- workspace

---

# 10. Global Search

Search must index:

- Agents
- Tasks
- Runs
- Jobs
- Logs
- Memory
- Cost records

Requirements:

- Full-text search
- Filter-based search
- Permission-aware results
- Grouped results by type

---

# 11. Core Data Models

## Agent

```json
{
  "id": "uuid",
  "name": "Gumbo",
  "profile_id": "uuid",
  "model": "claude-sonnet-4.5",
  "status": "idle",
  "concurrency_limit": 2,
  "budget_limit_usd": 50,
  "created_at": "timestamp"
}
```

## Profile

```json
{
  "id": "uuid",
  "name": "Ops Assistant",
  "system_prompt": "You are an operations AI...",
  "default_model": "claude-sonnet-4.5",
  "tool_permissions": ["web", "files"],
  "memory_policy": "workspace_scoped"
}
```

## Task

```json
{
  "id": "uuid",
  "title": "Daily synthesis",
  "status": "in_progress",
  "assigned_agent_id": "uuid",
  "eta_minutes": 12,
  "progress_percent": 65,
  "priority": "medium"
}
```

## Run

```json
{
  "id": "uuid",
  "task_id": "uuid",
  "agent_id": "uuid",
  "status": "executing",
  "tokens_input": 1200,
  "tokens_output": 600,
  "cost_usd": 0.34
}
```

## CostRecord

```json
{
  "id": "uuid",
  "run_id": "uuid",
  "agent_id": "uuid",
  "model": "claude-sonnet-4.5",
  "input_tokens": 1200,
  "output_tokens": 600,
  "cost_usd": 0.34,
  "timestamp": "timestamp"
}
```

---

# 12. Non-Functional Requirements

- Real-time updates (websocket or event streaming preferred)
- Multi-tenant support
- Role-based permissions (Admin, Operator, Viewer)
- Audit log for task movement and agent actions
- Scalable to:
  - 50 agents
  - 500 tasks
  - 10k runs
- Search response < 300ms
- Board load < 2 seconds

---

# 13. Acceptance Criteria

The system is complete when:

- Agents can be created, assigned profiles, and assigned models
- Kanban board reflects live execution state
- Tasks update automatically from run status
- ETA updates dynamically
- Cost HUD updates in real-time
- Global search retrieves tasks, runs, memory, and logs
- Budget alerts trigger correctly
- All major actions are logged

---

# END OF SPEC
