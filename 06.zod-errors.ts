import { z } from "zod";

const numberOfGuests = z.object({
  numberOfGuests: z.number().min(1).max(4)
})

// Synchronous parse with invalid data
try {
  numberOfGuests.parse({ numberOfGuests: 5 });
  numberOfGuests.parse({ numberOfGuests: 0 });
  numberOfGuests.parse({numberOfGuests: "hi there" });
} catch (e) {
  console.error("parse failed:", (e as z.ZodError).errors);
  if (e instanceof z.ZodError) {
    console.error("parse failed:", e.errors);

    for (const zodIssue of e.errors){
      console.error(zodIssue.code)
      console.error(zodIssue.fatal)
      console.error(zodIssue.message)
      console.error(zodIssue.path)
    }
    
  }
}

console.log('-------')

const safeParseResult = numberOfGuests.safeParse({ numberOfGuests: 5 });
if (safeParseResult.error){ // tupe guard over error
  console.log(safeParseResult.error.format())
}