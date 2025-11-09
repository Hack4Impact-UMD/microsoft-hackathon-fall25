import {
  QuietHobby,
  CreateQuietHobbyRequest,
  UpdateQuietHobbyRequest,
} from "./types";

// Mock database - in a real app, this would be replaced with actual API calls
let quietHobbies: QuietHobby[] = [
  {
    id: "1",
    name: "Reading",
    category: "Quiet Hobbies",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Drawing",
    category: "Quiet Hobbies",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Meditation",
    category: "Quiet Hobbies",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Puzzle Solving",
    category: "Quiet Hobbies",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Journaling",
    category: "Quiet Hobbies",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const quietHobbiesApi = {
  // Get all quiet hobbies
  async getAll(): Promise<QuietHobby[]> {
    await delay(300); // Simulate network delay
    return [...quietHobbies];
  },

  // Get a single quiet hobby by ID
  async getById(id: string): Promise<QuietHobby | null> {
    await delay(200);
    return quietHobbies.find((hobby) => hobby.id === id) || null;
  },

  // Create a new quiet hobby
  async create(request: CreateQuietHobbyRequest): Promise<QuietHobby> {
    await delay(400);

    const newHobby: QuietHobby = {
      id: Date.now().toString(), // Simple ID generation
      name: request.name,
      icon: request.icon,
      category: "Quiet Hobbies",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    quietHobbies.push(newHobby);
    return newHobby;
  },

  // Update an existing quiet hobby
  async update(request: UpdateQuietHobbyRequest): Promise<QuietHobby | null> {
    await delay(400);

    const index = quietHobbies.findIndex((hobby) => hobby.id === request.id);
    if (index === -1) return null;

    const updatedHobby: QuietHobby = {
      ...quietHobbies[index],
      ...(request.name && { name: request.name }),
      ...(request.icon !== undefined && { icon: request.icon }),
      updatedAt: new Date().toISOString(),
    };

    quietHobbies[index] = updatedHobby;
    return updatedHobby;
  },

  // Delete a quiet hobby
  async delete(id: string): Promise<boolean> {
    await delay(300);

    const index = quietHobbies.findIndex((hobby) => hobby.id === id);
    if (index === -1) return false;

    quietHobbies.splice(index, 1);
    return true;
  },

  // Search quiet hobbies by name
  async search(query: string): Promise<QuietHobby[]> {
    await delay(200);

    const lowercaseQuery = query.toLowerCase();
    return quietHobbies.filter((hobby) =>
      hobby.name.toLowerCase().includes(lowercaseQuery),
    );
  },
};

// Export individual functions for convenience
export const {
  getAll: getQuietHobbies,
  getById: getQuietHobbyById,
  create: createQuietHobby,
  update: updateQuietHobby,
  delete: deleteQuietHobby,
  search: searchQuietHobbies,
} = quietHobbiesApi;
