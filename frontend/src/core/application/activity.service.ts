import { Activity } from '../domain/activity.model';
import { activityApi } from '../../infrastructure/api/activity.api';

export class ActivityService {
  async getAllActivities(): Promise<Activity[]> {
    try {
      return await activityApi.getActivities();
    } catch (error) {
      throw error;
    }
  }

  async getActivityById(id: string): Promise<Activity> {
    try {
      return await activityApi.getActivityById(id);
    } catch (error) {
      throw error;
    }
  }

  async createActivity(activityData: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity> {
    try {
      return await activityApi.createActivity(activityData);
    } catch (error) {
      throw error;
    }
  }

  async updateActivity(id: string, activityData: Partial<Activity>): Promise<Activity> {
    try {
      return await activityApi.updateActivity(id, activityData);
    } catch (error) {
      throw error;
    }
  }

  async deleteActivity(id: string): Promise<void> {
    try {
      await activityApi.deleteActivity(id);
    } catch (error) {
      throw error;
    }
  }
}

export const activityService = new ActivityService();