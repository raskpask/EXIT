const controller = require('../controller/controller');
const dbErrors = require('../error/dbErrors');

/**
 * Routes all api requests. 
 * All client requests will be send here and and the right functions here will send a request to the controller.
 *
 * @param {App} router - The express application.
 */
function router(router) {
    router.post('/api/user', async (req, res) => {
        try {
            const statusCode = await controller.registerUser(req);
            res.status(statusCode);
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });

    router.put('/api/user', async (req, res) => {
        try {
            const statusCode = await controller.updateUser(req);
            res.status(statusCode);
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error.message);
        }
        res.send();
    });

    router.get('/api/user', async (req, res) => {
        try {
            const user = await controller.getUser(req);
            res.send(JSON.stringify({ user: user }));
        } catch (error) {
            dbErrors.respondError(error.message, res)
            console.error(error)
        }
    });
    router.delete('/api/user', async (req, res) => {
        try {
            // const statusCode = await controller.registerUser(req);
            res.status(500);
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    
    router.get('/api/project', async (req, res) => {
        try {
            const project = await controller.getProject(req);
            // res.status(statusCode);
            res.send(JSON.stringify(project));
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        //res.send();
    });
    router.post('/api/project', async (req, res) => {
        try {
            const statusCode = await controller.registerProject(req);
            //res.status(statusCode);
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });

    router.get('/api/expertise', async (req, res) => {
        try {
            // Fects the expertise of the user
            res.send(500)
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.post('/api/expertise', async (req, res) => {
        try {
            // Adds the expertise to user
            res.send(500)
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.put('/api/expertise', async (req, res) => {
        try {
            // Updates the expertise of the user
            res.send(500)
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.delete('/api/expertise', async (req, res) => {
        try {
            // Deletes the expertise of the user
            res.send(500)
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.get('/api/budgetYear', async (req, res) => {
        try {
            // Send a budget year
            res.send(await controller.getBudgetYear(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.post('/api/budgetYear', async (req, res) => {
        try {
            await controller.postBudgetYear(req)
            res.send()
        } catch (err) {
            console.error(err)
        }
    });
    router.put('/api/budgetYear', async (req, res) => {
        try {
            await controller.updateBudgetYear(req)
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.delete('/api/budgetYear', async (req, res) => {
        try {
            await controller.deleteBudgetYear(req)
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });

}
module.exports = {
    router,
}