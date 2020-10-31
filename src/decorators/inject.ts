const services = new Map();

export function Inject(service: new (...args: unknown[]) => unknown): PropertyDecorator {
    return (target: Record<string, unknown>, key: string) => {
        if (!services.has(service)) {
            services.set(service, new service());
        }

        target[key] = services.get(service);
    };
}
