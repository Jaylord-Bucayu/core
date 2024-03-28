


export function generateStudentId(): string {
    const minId = 1000; // Minimum student ID
    const maxId = 9999; // Maximum student ID

    // Generate a random number within the specified range
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

    // Convert the random number to a string and return it as the student ID
    return randomId.toString();
  }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function formatDate(dateString:any) :string {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0'); // Get day with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero if needed
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
}
