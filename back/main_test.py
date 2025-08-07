import pytest
from fastapi.testclient import TestClient
from main import server

client = TestClient(server)
def test_create_user():
    response = client.post("/users", json={
        "email": "test@example.com",
        "display_name": "Test User",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["display_name"] == "Test User"

def test_get_vendors():
    response = client.get("/vendors")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

