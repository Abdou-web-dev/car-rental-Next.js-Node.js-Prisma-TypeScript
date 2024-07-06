export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date"; //
  }
};

export const formatElapsedTime = (timestamp: Date) => {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - timestamp.getTime();
  const elapsedSeconds = elapsedMilliseconds / 1000;

  if (elapsedSeconds < 60) {
    return `${Math.floor(elapsedSeconds)} seconds`;
  } else if (elapsedSeconds < 3600) {
    return `${Math.floor(elapsedSeconds / 60)} minutes`;
  } else if (elapsedSeconds < 86400) {
    return `${Math.floor(elapsedSeconds / 3600)} hours`;
  } else {
    return `${Math.floor(elapsedSeconds / 86400)} days`;
  }
};
