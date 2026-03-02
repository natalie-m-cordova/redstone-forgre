# Decisions Log

## Backend Framework
Decision: Use Python + FastAPI
Reason: Cross-platform, simple deployment, easy subprocess control.

## Storage Model
Decision: JSON files on disk (no database for MVP).
Reason: Simplicity and portability to Linux.

## Security Model
Decision: LAN-only, no public exposure.
Reason: Home infrastructure use case.

## Runner Strategy
Decision: Abstract runner layer so Windows and Linux implementations differ but API stays consistent.
Reason: Enables Phase 2 migration cleanly.