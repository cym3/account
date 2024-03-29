import clientDB from '@core/domain/entities/db'
import { EntityNotFoundError } from '@core/domain/errors/domain_error'
import { UpdateUserDB } from '@user/domain/Contracts/UpdateUser'
import { createDateUTC } from '@utils/date'
import { ObjectId } from 'mongodb'
import { UserEntity } from 'mozeconomia'

export const updateUserDB: UpdateUserDB = async (data) => {
  const { userId, name, phoneNumber, image, address } = data
  const collection = (await clientDB).db().collection('users')
  const id = new ObjectId(userId)

  const updatedAt = createDateUTC().format()

  if (name) {
    await collection.updateOne({ _id: id }, {
      $set: {
        name,
        updatedAt
      }
    })
  }

  if (phoneNumber) {
    await collection.updateOne({ _id: id }, {
      $set: {
        phoneNumber,
        updatedAt
      }
    })
  }

  if (image) {
    await collection.updateOne({ _id: id }, {
      $set: {
        image,
        updatedAt
      }
    })
  }

  if (address) {
    await collection.updateOne({ _id: id }, {
      $set: {
        address,
        updatedAt
      }
    })
  }

  const foundUser = await collection.findOne({ _id: id }) as unknown as UserEntity

  if (!foundUser) {
    throw new EntityNotFoundError()
  }

  return {
    id: id.toString(),
    email: foundUser.email,
    name: foundUser.name,
    phoneNumber: foundUser.phoneNumber,
    image: foundUser.image,
    emailVerified: foundUser.emailVerified,
    admin: foundUser.admin,
    address: foundUser.address,
    updatedAt: foundUser.updatedAt
  }
}
