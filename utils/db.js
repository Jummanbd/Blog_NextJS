

import mongoose from "mongoose";

   const connect = async () => {
    try{
      await mongoose.connect(process.env.MONGO_KEY);
      console.log('DB CONNECT');
    }catch(error) {
      console.log(error);
      
    }
}


export default connect;