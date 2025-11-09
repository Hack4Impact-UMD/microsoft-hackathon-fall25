// this file houses imports for icon components, an interface for icon options, and a list of all available icons for selection
// you can use this file to add or remove icons from the list for when you have actual icons to add

import React from "react";
import {
  SportsSoccer,
  MenuBook,
  MusicNote,
  Palette,
  SportsEsports,
  CameraAlt,
  Restaurant,
  LocalFlorist,
  CleaningServices,
  LocalLaundryService,
  DinnerDining,
  Delete,
  ShoppingCart,
  Inventory,
  Build,
  Code,
  DesignServices,
  Edit,
  Translate,
  Calculate,
  Science,
  PresentToAll,
  Group,
  Shower,
  Face,
  ContentCut,
  FitnessCenter,
  Psychology,
  Bedtime,
  Medication,
} from "@mui/icons-material";

/**
 * interface for individual icon options
 */
export interface IconOption {
  name: string;
  icon: React.ComponentType<any>;
}

/**
 * Icon List Configuration
 *
 * Simple flat list of all available activity icons with their components.
 */
export const iconList: IconOption[] = [
  { name: "Sports", icon: SportsSoccer },
  { name: "Read", icon: MenuBook },
  { name: "Music", icon: MusicNote },
  { name: "Art", icon: Palette },
  { name: "Game", icon: SportsEsports },
  { name: "Photo", icon: CameraAlt },
  { name: "Cook", icon: Restaurant },
  { name: "Garden", icon: LocalFlorist },
  { name: "Clean", icon: CleaningServices },
  { name: "Laundry", icon: LocalLaundryService },
  { name: "Dishes", icon: DinnerDining },
  { name: "Vacuum", icon: CleaningServices },
  { name: "Trash", icon: Delete },
  { name: "Shop", icon: ShoppingCart },
  { name: "Organize", icon: Inventory },
  { name: "Fix", icon: Build },
  { name: "Code", icon: Code },
  { name: "Design", icon: DesignServices },
  { name: "Write", icon: Edit },
  { name: "Language", icon: Translate },
  { name: "Math", icon: Calculate },
  { name: "Science", icon: Science },
  { name: "Present", icon: PresentToAll },
  { name: "Lead", icon: Group },
  { name: "Shower", icon: Shower },
  { name: "Teeth", icon: CleaningServices },
  { name: "Skin", icon: Face },
  { name: "Hair", icon: ContentCut },
  { name: "Exercise", icon: FitnessCenter },
  { name: "Meditate", icon: Psychology },
  { name: "Sleep", icon: Bedtime },
  { name: "Vitamins", icon: Medication },
];
