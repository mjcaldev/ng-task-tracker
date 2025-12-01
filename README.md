# ng-task-tracker

A minimal, modern task board built with Angular 18, Standalone Components, and Signals.  
Includes a three-column Kanban layout (To Do / Doing / Done), a slide-out task editor, and a lightweight signal-based store for state management.

---

## Features

- Create tasks  
- Move tasks between columns  
- Click-to-edit with slide-out detail panel  
- Update or delete tasks  
- Fully reactive state using Angular Signals  
- Simple, modular component architecture  

---

## Tech Stack

- Angular 18  
- Standalone Components  
- Signals API  
- TypeScript + SCSS  

---

## Project Structure

src/app/
models/
state/
ui/
pages/
app.routes.ts
app.config.ts

yaml
Copy code

---

## Development

Install and run:

npm install
ng serve

yaml
Copy code

App runs at:

http://localhost:4200

yaml
Copy code

Production build:

ng build

markdown
Copy code

---

## Next Steps

### Electron Integration

- Bundle Angular with Electron for a desktop version  
- Expose local filesystem for offline task storage  
- Optional: integrate IndexedDB or SQLite via Electron main process  

### AWS Backend Integration

- Deploy backend via:
  - API Gateway  
  - AWS Lambda (Node or Python)  
  - DynamoDB (task storage)  
- Use Angular HttpClient to sync tasks (CRUD + real-time updates using DynamoDB Streams or WebSockets)  

### Additional Enhancements

- Drag-and-drop task movement (Angular CDK)  
- LocalStorage or IndexedDB persistence  
- UI polish + animations  
- Optional PWA mode for offline-first support  