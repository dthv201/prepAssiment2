
const appInit = require("./server");
// Start the server
  
  const PORT = process.env.PORT || 3000;
  const tmpFunc = async()=>{
   const app = await appInit();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
  
};
  
tmpFunc();


// module.exports = app;