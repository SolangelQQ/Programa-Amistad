export interface Friendship {
    id: string;
    buddyId: string;
    buddyName: string;
    partnerId: string;
    partnerName: string;
    status: 'pending' | 'active' | 'inactive';
    startDate: Date;
    endDate?: Date;
    // activities?: Activity[];
  }