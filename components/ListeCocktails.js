import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ListeCocktails = ({ navigation }) => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isEndReached, setIsEndReached] = useState(false);

    useEffect(() => {
        fetchCocktails();
    }, []);

    const fetchCocktails = async () => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&page=${page}`);
            if (response.data.drinks.length > 0) {
                setCocktails(prevCocktails => [...prevCocktails, ...response.data.drinks]);
            } else {
                setIsEndReached(true);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('DetailsCocktail', { cocktailId: item.idDrink })}
            >
                <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.strDrinkThumb }} />
                    <View style={styles.imageOverlay} />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{item.strDrink}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleLoadMore = () => {
        if (!isEndReached) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <ActivityIndicator
                size="large"
                style={{ marginVertical: 20 }}
            />
        );
    };

    return (
        <View>
            <FlatList
                data={cocktails}
                renderItem={renderItem}
                keyExtractor={item => item.idDrink}
                onEndReachedThreshold={0.1}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        margin: 20,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemImageContainer: {
        position: 'relative',
        height: 220,
    },
    itemImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    itemTextContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
    }
});

export default ListeCocktails;