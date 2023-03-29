import { Router } from 'express'
import * as productsCtrl from '../controllers/posts.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', productsCtrl.index)
router.post('/', productsCtrl.create)
router.get('/:id', productsCtrl.show)
router.put('/:id', productsCtrl.update)


export { router }
