import {format as formatDate} from "date-fns";

export default function readableDate(date: Date) {
  return formatDate(date, "MMMM d, yyyy");
}