// Azure Database Types
export interface Assignment {
  ID: string;
  Name: string;
  Date: string;
  StartTime: string;
  EndTime: string;
  Event: Event;
}

export interface Event {
  ID: string;
  Category: string;
  Name: string;
  Icon: string; // Image type
  Complete: boolean;
  Tasks: Task[];
  Image: string; // Image type
}

export interface TaskAssignment {
  Task_ID: string;
  Complete: boolean;
}

export interface Task {
  ID: string;
  Name: string;
  Icon: string; // Image type
  Category: TaskCategory;
}

export type TaskCategory = 
  | "Hobbies"
  | "Hygiene" 
  | "Chores"
  | "Skills"
  | "Quiet Hobbies"
  | "Miscellaneous";

export interface Feedback {
  ID: string;
  TaskAssignmentID: string;
  TaskID: string;
  Reaction: "yes" | "maybe" | "no";
}

// Quiet Hobbies specific types
export interface QuietHobby {
  id: string;
  name: string;
  icon?: string; // URL or base64 for icon
  category: "Quiet Hobbies";
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuietHobbyRequest {
  name: string;
  icon?: string;
}

export interface UpdateQuietHobbyRequest {
  id: string;
  name?: string;
  icon?: string;
}

// UI Component Props
export interface QuietHobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeRange?: string;
  hobbies: QuietHobby[];
  onChooseActivity: (hobbyId: string) => void;
  onTakePhoto: (photoDataUrl: string) => void;
  initialHobbyId?: string;
}

export interface QuietHobbiesStaffProps {
  onHobbyCreated?: (hobby: QuietHobby) => void;
  onHobbyUpdated?: (hobby: QuietHobby) => void;
  onHobbyDeleted?: (hobbyId: string) => void;
}

export interface QuietHobbiesParticipantProps {
   onBack: () => void;
  onActivityChosen: (activity: any) => void;
  onPhotoTaken: () => void;
}
