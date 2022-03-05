const loader = () => {
  return (
    <div class="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
        <div
        class="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"
        ></div>
        <div
        class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
        ></div>
        <div
        class="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"
        ></div>
    </div>
  );
};

export default loader;
