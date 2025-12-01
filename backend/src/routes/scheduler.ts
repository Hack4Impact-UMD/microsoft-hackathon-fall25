import { Request, Response, Router } from "express";
import {
  addEvent,
  addFeedback,
  addTask,
  deleteTask,
  getAllItems,
  getContainer,
  queryItems,
} from "../cosmos";
import {
  Event,
  Feedback,
  Task,
  TaskCategory,
} from "../../../rise-dc-app/src/shared/types";

const SCHEDULING_DB = process.env.COSMOS_SCHEDULING_DB || "Scheduling";

const schedulerRouter = Router();

// ===== TASKS =====
schedulerRouter.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { userId, icon, name, image, startTime, endTime, category } = req.body;
    const task: Task = {
      id: `task_${Date.now()}`,
      userId: userId,
      name: name,
      icon: icon,
      image: image,
      startTime: startTime,
      endTime: endTime,
      category: category,
      complete: false,
    }
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
    const { userId, name, icon, steps, image, startTime, endTime, category, complete } = req.body;
    const event: Event = {
      id: `event_${Date.now()}`,
      userId: userId || "",
      name,
      icon: icon || "",
      complete: complete || false,
      steps: steps || [],
      image: image || { id: "", caption: "" },
      startTime: startTime || "",
      endTime: endTime || "",
      category: (category as TaskCategory) || TaskCategory.Misc,
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


// ===== FEEDBACK =====
schedulerRouter.post("/feedback", async (req: Request, res: Response) => {
  try {
    const { taskId, reaction } = req.body;
    const feedback: Feedback = {
      id: `feedback_${Date.now()}`,
      taskAssignmentId: "",
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
