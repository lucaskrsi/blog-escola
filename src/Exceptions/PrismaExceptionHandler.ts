export class  PrismaExceptionHandler{
    public static handleError(code: string){
        switch (code) {
            case "P1008":
                throw new Error("Operations timed out after {time}");
                break;
            case "P2000":
                throw new Error("Provided value is too long");
                break;
            case "P2001":
                throw new Error("Searched parameter does not exist");
            case "P2002":
                throw new Error("There is a unique constraint violation, a new user cannot be created with this email");
                break;
            case "P2018":
                throw new Error("The required connected records were not found. {details}");
                break;
            default:
                throw new Error("An error occurred while trying to conclude the operation");
                break;
        }
    }
}
