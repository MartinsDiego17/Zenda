import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { data_questions, type Question } from "../utils/dataQuestions"

export const Quiestions = () => {
    return (
        <div className="w-screen h-fit  flex justify-center place-items-center">
            <div className="w-[70vw] h-[70vh] flex justify-center place-items-center flex-col">
                <h1 className="font-bold text-4xl mb-6">Preguntas frecuentes</h1>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="w-[45vw]"
                >
                    {
                        data_questions.map((question: Question) => (
                            <AccordionItem value={question.value} key={question.value}>
                                <AccordionTrigger className="cursor-pointer font-bold text-xl text-(--color-text-primary)">{question.title}</AccordionTrigger>
                                <AccordionContent className="text-pretty text-(--color-text-primary) opacity-80">{question.content}</AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>

            </div>
        </div>
    )
}
