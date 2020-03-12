const controller = require('../controller/controller');
const dbErrors = require('../error/dbErrors');


/**
 * Routes all api requests. 
 * All client requests will be send here and and the right functions here will send a request to the controller.
 *
 * @param {App} router - The express application.
 */
function router(router) {

    router.get('/api/login', async (req, res) => {
        console.log("Login()")
        sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
            if (err != null){
              return res.send(500);
            }
            res.redirect(login_url);
          });
    });
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
            res.send(await controller.getUser(req));
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
            res.send(project);
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
    router.put('/api/project', async (req, res) => {
        try {
            await controller.updateProject(req);
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.delete('/api/project', async (req, res) => {
        try {
            const project = await controller.deleteProject(req);
            // res.status(statusCode);
            res.send(project);
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        //res.send();
    });
    router.get('/api/workYear', async (req, res) => {
        try {
            res.send(await controller.getWorkYear(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    router.post('/api/workYear', async (req, res) => {
        try {
            res.send(await controller.postWorkYear(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    postWorkYear
    router.put('/api/workYear', async (req, res) => {
        try {
            res.send(await controller.updateWorkYear(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    router.get('/api/availableExaminers', async (req, res) => {
        try {
            res.send(await controller.getAvailableExaminers(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    router.get('/api/availableSupervisors', async (req, res) => {
        try {
            res.send(await controller.getAvailableSupervisors(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
        res.send();
    });
    router.get('/api/expertise', async (req, res) => {
        try {
            res.send(await controller.getExpertise(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.post('/api/expertise', async (req, res) => {
        try {
            await controller.postExpertise(req)
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.put('/api/expertise', async (req, res) => {
        try {
            await controller.updateExpertise(req)
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.delete('/api/expertise', async (req, res) => {
        try {
            await controller.deleteExpertise(req)
            res.send()
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.get('/api/budgetYear', async (req, res) => {
        try {
            res.send(await controller.getBudgetYear(req))
        } catch (error) {
            dbErrors.respondError(error.message, res)
        }
    });
    router.post('/api/budgetYear', async (req, res) => {
        try {
            await controller.postBudgetYear(req)
            res.send()
        } catch (error) {
            console.error(error)
            dbErrors.respondError(error.message,res)
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