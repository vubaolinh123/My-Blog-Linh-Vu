const Icon = {
    QuestionCircleFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-question-circle-fill ${className}`}></i>
        );
    },
    Search({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-search ${className}`}></i>
        );
    },
    Right({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-arrow-right ${className}`}></i>
        );
    },
    Tags({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-tags-fill ${className}`}></i>
        );
    },
    //menu
    Close({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-x-lg ${className}`}></i>
        );
    },
    List({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-list ${className}`}></i>
        );
    },
    HomeFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-house-fill ${className}`}></i>
        );
    },
    SunFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-sun-fill ${className}`}></i>
        );
    },
    FolderFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-folder-fill ${className}`}></i>
        );
    },
    GearFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-gear-fill ${className}`}></i>
        );
    },
    Image({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-image ${className}`}></i>
        );
    },
    PenFill({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-pen-fill ${className}`}></i>
        );
    },
    // social
    Facebook({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-facebook ${className}`}></i>
        );
    },
    Youtube({ className, ...props }: any) {
        return (
            <i {...props} className={`bi bi-youtube ${className}`}></i>
        );
    },
}
export default Icon