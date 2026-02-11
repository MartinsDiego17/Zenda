import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCurrentReservation = () => {
    return (
        <div className="flex w-full h-full max-w-xs flex-col gap-2" >
            <Skeleton className="h-4 w-full dark" />
            <Skeleton className="h-8 w-full dark" />
        </div>
    )
}
