import { SeaMailerClient } from 'seamailer-nodejs';

export default () => new SeaMailerClient(process.env.SEAMAILER_API_KEY);
