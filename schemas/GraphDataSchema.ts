import { z } from "zod";

const elementSchema = z.object({
    keyIndex: z.string(),
    activated: z.number(),
    "not activated": z.number()
})

const GraphDataSchema = z.array(elementSchema)

export default GraphDataSchema;
