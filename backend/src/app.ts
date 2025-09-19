import express, { Request, Response } from "express";
import { CosmosClient } from '@azure/cosmos';
import dotenv from "dotenv";
import { 
  addTask, 
  addEvent, 
  addAssignment, 
  addFeedback, 
  deleteTask, 
  getContainer 
} from "./cosmos";
import { Task, Event, Assignment, Feedback } from "../../rise-dc-app/src/shared/types";

dotenv.config(); 

const app = express();
const port = 3000;

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Cosmos setup
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;
const COSMOS_KEY = process.env.COSMOS_KEY;
const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";

export const cosmosClient = new CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });

// Helper functions
async function getAllItems<T>(containerName: string): Promise<T[]> {
  const container = getContainer(SCHEDULING_DB, containerName);
  const { resources } = await container.items.readAll<T>().fetchAll();
  return resources;
}

async function queryItems<T>(containerName: string, query: string, parameters?: any[]): Promise<T[]> {
  const container = getContainer(SCHEDULING_DB, containerName);
  const { resources } = await container.items.query<T>({
    query,
    parameters: parameters || []
  }).fetchAll();
  return resources;
}

/* ========= API ROUTES ========= */

// Test route
app.get('/', (_, res: Response) => res.send('RISE DC Scheduling API is running!'));

// ===== TASKS =====
app.post('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { taskName, steps } = req.body;
    const task: Task = {
      id: `task_${Date.now()}`,
      name: taskName,
      icon: "",
      steps: steps || [],
      category: 'Miscellaneous'
    };
    const createdTask = await addTask(task);
    return res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/api/tasks', async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let tasks: Task[];
    if (search) {
      tasks = await queryItems<Task>(
        "Tasks",
        "SELECT * FROM c WHERE CONTAINS(LOWER(c.name), LOWER(@searchTerm))",
        [{ name: "@searchTerm", value: search as string }]
      );
    } else {
      tasks = await getAllItems<Task>("Tasks");
    }
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const container = getContainer(SCHEDULING_DB, "Tasks");
    const { resource } = await container.item(id, id).read<Task>();
    if (!resource) return res.status(404).json({ error: 'Task not found' });
    return res.json(resource);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch task' });
  }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    return res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete task' });
  }
});

// ===== EVENTS =====
app.post('/api/events', async (req: Request, res: Response) => {
  try {
    const { name, icon, tasks, image } = req.body;
    const event: Event = {
      id: `event_${Date.now()}`,
      name,
      icon: icon || "",
      tasks: tasks || [],
      image: image || { id: "", caption: "" }
    };
    const createdEvent = await addEvent(event);
    return res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

app.get('/api/events', async (_, res: Response) => {
  try {
    const events = await getAllItems<Event>("Events");
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ===== ASSIGNMENTS =====
app.post('/api/assignments', async (req: Request, res: Response) => {
  try {
    const { complete, date, startTime, endTime, event } = req.body;
    const assignment: Assignment = {
      id: `assignment_${Date.now()}`,
      complete: complete || false,
      date,
      startTime,
      endTime,
      event
    };
    const createdAssignment = await addAssignment(assignment);
    return res.status(201).json(createdAssignment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create assignment' });
  }
});

app.get('/api/assignments', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    let assignments: Assignment[];
    if (date) {
      assignments = await queryItems<Assignment>(
        "Assignments",
        "SELECT * FROM c WHERE c.date = @date",
        [{ name: "@date", value: date as string }]
      );
    } else {
      assignments = await getAllItems<Assignment>("Assignments");
    }
    return res.json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// ===== FEEDBACK =====
app.post('/api/feedback', async (req: Request, res: Response) => {
  try {
    const { taskAssignmentId, taskId, reaction } = req.body;
    const feedback: Feedback = {
      id: `feedback_${Date.now()}`,
      taskAssignmentId,
      taskId,
      reaction
    };
    const createdFeedback = await addFeedback(feedback);
    return res.status(201).json(createdFeedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Error handler
app.use((err: any, _: Request, res: Response, __: any) => {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 RISE DC API server listening on port ${port}`);
  console.log(`📊 Using Cosmos DB: ${SCHEDULING_DB}`);
});
