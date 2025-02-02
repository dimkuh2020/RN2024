//файл для использования (получения) данных из БД
import { useState, useEffect } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]); // getAllPosts() из appwrite.js
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { //извлекаем данные как только загрузится компонент или екран
    const fetchData = async () => { 
        setIsLoading(true);
        try {
            const response = await fn() // тащим данные. тут подставляем разные функции типа gatAllPosts() 
            setData(response);
        } catch (error) {
            Alert.error('Error', error.message)
        } finally {
            setIsLoading(false);
        }
    }
    fetchData(); //сразу вызываем      
    }, [])

    const refetch = () => fetchData(); // чтобы использовать повторно на странице для рефреша

    return { data, isLoading, refetch }
}

export default useAppwrite
