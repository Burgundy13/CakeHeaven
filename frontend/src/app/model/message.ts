export class Message {
  _id: number;
  name: string;
  email: string;
  message: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.name = (obj && obj.name) || '';
    this.email = (obj && obj.email) || '';
    this.message = (obj && obj.message) || '';
  }
}
