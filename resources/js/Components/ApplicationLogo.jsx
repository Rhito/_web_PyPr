export default function ApplicationLogo({ className, ...props }) {
    return (
        <img
            src={`/images/a194f826-40a1-4700-97f3-2d23f1a5d936-removebg.png`}
            className={`w-12 h-auto scale-110 ${className || ""}`}
            alt="Logo"
            {...props}
        />
    );
}
