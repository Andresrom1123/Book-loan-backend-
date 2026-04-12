interface TokenData {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

class Token {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: TokenData) {
    this.id = data.id;
    this.userId = data.userId;
    this.token = data.token;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export default Token;
