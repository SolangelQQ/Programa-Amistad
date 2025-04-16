import { Activity } from '../../core/domain/activity.model';
import { apiClient } from './apiClient';

class ActivityApi {
  async getActivities(): Promise<Activity[]> {
    return apiClient.get<Activity[]>('/activities');
  }

  async getActivityById(id: string): Promise<Activity> {
    return apiClient.get<Activity>(`/activities/${id}`);
  }

  async createActivity(activityData: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity> {
    return apiClient.post<Activity>('/activities', activityData);
  }

  async updateActivity(id: string, activityData: Partial<Activity>): Promise<Activity> {
    return apiClient.put<Activity>(`/activities/${id}`, activityData);
  }

  async deleteActivity(id: string): Promise<void> {
    return apiClient.delete(`/activities/${id}`);
  }
}

export const activityApi = new ActivityApi();