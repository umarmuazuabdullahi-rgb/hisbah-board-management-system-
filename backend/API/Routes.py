from fastapi import APIRouter
from app.models import CASES, ACTIVITIES

router = APIRouter()

@router.get("/dashboard-stats")
def get_dashboard_stats():
    return {
        "total_cases": len(CASES),
        "open_incidents": sum(1 for c in CASES if c["status"] == "Open"),
        "today_patrols": 3,
        "on_duty_officers": 8
    }

@router.get("/cases/recent")
def get_recent_cases():
    return CASES[-5:][::-1]

@router.get("/activities/recent")
def get_activities():
    return ACTIVITIES[-8:][::-1]
