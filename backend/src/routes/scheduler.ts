import { Request, Response, Router } from "express";
import {
  addAssignment,
  addEvent,
  addFeedback,
  addTask,
  deleteTask,
  getAllItems,
  getContainer,
  queryItems,
} from "../cosmos";
import {
  Assignment,
  Feedback,
  Task,
} from "../../../rise-dc-app/src/shared/types";

const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";

const schedulerRouter = Router();

// ===== TASKS =====
schedulerRouter.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { taskName, steps } = req.body;
    const task: Task = {
      id: `task_${Date.now()}`,
      name: taskName,
      icon: "",
      steps: steps || [],
      category: "Miscellaneous",
    };
    const createdTask = await addTask(task);
    return res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create task" });
  }
});

schedulerRouter.get("/tasks", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let tasks: Task[];
    if (search) {
      tasks = await queryItems<Task>(
        SCHEDULING_DB,
        "Tasks",
        "SELECT * FROM c WHERE CONTAINS(LOWER(c.name), LOWER(@searchTerm))",
        [{ name: "@searchTerm", value: search as string }],
      );
    } else {
      tasks = await getAllItems<Task>(SCHEDULING_DB, "Tasks");
    }
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

schedulerRouter.get("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const container = getContainer(SCHEDULING_DB, "Tasks");
    const { resource } = await container.item(id, id).read<Task>();
    if (!resource) return res.status(404).json({ error: "Task not found" });
    return res.json(resource);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch task" });
  }
});

schedulerRouter.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    return res.json({ message: "Task deleted successfully", id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete task" });
  }
});

schedulerRouter.post("/events", async (req: Request, res: Response) => {
  try {
    const { name, icon, tasks, image } = req.body;
    const event: Event = {
      id: `event_${Date.now()}`,
      name,
      icon: icon || "",
      tasks: tasks || [],
      image: image || { id: "", caption: "" },
    };
    const createdEvent = await addEvent(event);
    return res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create event" });
  }
});

schedulerRouter.get("/events", async (_, res: Response) => {
  try {
    const events = await getAllItems<Event>(SCHEDULING_DB, "Events");
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ===== ASSIGNMENTS =====
schedulerRouter.post("/assignments", async (req: Request, res: Response) => {
  try {
    const { complete, date, startTime, endTime, event } = req.body;
    const assignment: Assignment = {
      id: `assignment_${Date.now()}`,
      complete: complete || false,
      date,
      startTime,
      endTime,
      event,
    };
    const createdAssignment = await addAssignment(assignment);
    return res.status(201).json(createdAssignment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create assignment" });
  }
});

schedulerRouter.get("/assignments", async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    let assignments: Assignment[];
    if (date) {
      assignments = await queryItems<Assignment>(
        SCHEDULING_DB,
        "Assignments",
        "SELECT * FROM c WHERE c.date = @date",
        [{ name: "@date", value: date as string }],
      );
    } else {
      assignments = await getAllItems<Assignment>(SCHEDULING_DB, "Assignments");
    }
    return res.json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// ===== FEEDBACK =====
schedulerRouter.post("/feedback", async (req: Request, res: Response) => {
  try {
    const { taskAssignmentId, taskId, reaction } = req.body;
    const feedback: Feedback = {
      id: `feedback_${Date.now()}`,
      taskAssignmentId,
      taskId,
      reaction,
    };
    const createdFeedback = await addFeedback(feedback);
    return res.status(201).json(createdFeedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to submit feedback" });
  }
});

export default schedulerRouter;
