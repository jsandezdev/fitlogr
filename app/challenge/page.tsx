import { prisma } from "@/lib/prisma"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default async function ChallengePage() {

  const challenges = await prisma.challenge.findMany({
    // where: {
    //   author: { id: userId },
    // },
  })

  return (
    <>
    <div>Hello! Number of challenges: {challenges.length}</div>
    <p>https://ui.shadcn.com/docs/components/alert</p>
    <a href="https://github.com/shadcn/ui/blob/main/apps/www/app/examples/authentication/page.tsx" target="_blank">Ejemplo</a>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </>
  )
}