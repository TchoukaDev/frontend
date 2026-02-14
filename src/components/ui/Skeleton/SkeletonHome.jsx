export default function SkeletonHome() {
    return (
        <div className="min-h-[80vh] flex flex-col justify-between gap-10">
            <div className="w-9/10 mx-auto flex flex-col justify-between grow">
                <div className="h-50 flex justify-between items-center">
                    <div className="w-50 h-25 bg-blue1 rounded-xl animate-pulse"></div>
                    <div className="w-50 h-20 bg-blue1 rounded-xl animate-pulse"></div>

                </div>
            </div>
            <div className="h-20 w-70 bg-blue1 animate-pulse mx-auto rounded-xl"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="h-50 w-70 bg-blue1 animate-pulse mx-auto rounded-xl"></div>
                <div className="h-50 w-100 bg-blue1 animate-pulse mx-auto rounded-xl"></div></div>
            <div className="h-20 bg-sand animate-pulse"></div>
        </div>



    )
}