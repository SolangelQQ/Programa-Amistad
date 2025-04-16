export interface Activity {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    participants: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }