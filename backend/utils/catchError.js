import mongoose from "mongoose";

export const catchError = (controller) => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res, next))
            .catch((err) => {
                console.error(err);
                next(err);
            });
    };
};

export const catchTransactionError = (controller) => {
    return (req, res, next) => {

        const promise = mongoose.startSession()
            .then(session => {
                session.startTransaction();

                return controller(req, res, next, session)
                    .then(result => {
                        return session.commitTransaction()
                            .then(() => result);
                    })
                    .catch(async (err) => {
                        await session.abortTransaction();
                        throw err;
                    })
                    .finally(() => {
                        session.endSession();
                    });
            });

        Promise.resolve(promise)
            .catch((err) => {
                console.error(err);
                next(err);
            });
    };
};