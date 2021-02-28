let twites = require('../mockTwitterData.json');
  
twites = twites.statuses.map((status: any) => ({
  avatarUrl: status.user.profile_image_url,
  fullName: status.user.name,
  text: status.text,
  date: status.created_at,
  id: status.id,
}));

export class ApiService {

  static search(keywords: string) {
    return new Promise((resolve, reject) => {
      resolve(twites);
    });
  }
}