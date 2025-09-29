export const catchError = (controller) => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res, next))
            .catch((err) => {
                console.error(err);
                next(err);
            });
    };
};