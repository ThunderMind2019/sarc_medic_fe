# 🧑‍⚕️ Frontend - Patient Visit Dashboard

This is the frontend of a patient visit tracking system, built with Next.js. It displays patient data and their visit history in a simple, user-friendly interface. The application is currently designed to show all visits in a single table for quick visibility.

---

## 🧰 Tech Stack

- [Next.js 15+](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- API Integration with Django backend

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ThunderMind2019/sarc_medic_fe
cd sarc_medic_fe
```

### 2. Build and Run with Docker
```bash
docker-compose up --build
```


## UI Design Note
Currently, the patient data table lists all visits directly, which may result in duplicate rows for the same patient when they have multiple visits. This was a conscious decision made due to time constraints to prioritize delivering a working application.

Alternative UX approaches we could implement:

1. Accordion rows: Each row expands to reveal a nested table or details for visits.

2. "View Visits" Action Button: An action column with a button/icon that opens a popup/modal to display that patient's complete visit history.
