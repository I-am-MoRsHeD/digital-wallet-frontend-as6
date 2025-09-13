import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { items } from "@/constants/faqItems"

export default function Accordian() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground ps-7 pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
