import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'

import { db } from './firebase'

export const getUserData = async (userId) => {
    const userRef = doc(db, 'users', userId)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
        return null
    }

    return userSnapshot.data()
}

export const saveUserData = async (userId, data) => {
    const userRef = doc(db, 'users', userId)

    await setDoc(
        userRef,
        data,
        { merge: true }
    )
}

export const getExpenses = async (userId) => {
    const expensesRef = collection(
        db,
        'users',
        userId,
        'expenses'
    )

    const snapshot = await getDocs(expensesRef)

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    }))
}

export const addExpense = async (userId, expense) => {
    const expensesRef = collection(
        db,
        'users',
        userId,
        'expenses'
    )

    const expenseRef = await addDoc(
        expensesRef,
        expense
    )

    return {
        id: expenseRef.id,
        ...expense,
    }
}

export const updateExpense = async (
    userId,
    expenseId,
    expense
) => {
    const expenseRef = doc(
        db,
        'users',
        userId,
        'expenses',
        expenseId
    )

    await updateDoc(
        expenseRef,
        expense
    )
}

export const deleteExpense = async (
    userId,
    expenseId
) => {
    const expenseRef = doc(
        db,
        'users',
        userId,
        'expenses',
        expenseId
    )

    await deleteDoc(expenseRef)
}