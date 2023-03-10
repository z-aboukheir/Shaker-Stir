import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';

const DetailsCocktail = ({ route, navigation }) => {
    const { cocktailId } = route.params;
    const [cocktail, setCocktail] = useState({});

    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
            .then(response => {
                setCocktail(response.data.drinks[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [cocktailId]);

    const { strDrink, strDrinkThumb, strInstructions } = cocktail;

    const ingredients = [];
    const measures = [];


    for (let i = 1; i <= 15; i++) {
        let measure = cocktail[`strMeasure${i}`];
        let ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{strDrink}</Text>
            </View>
            <Image source={{ uri: strDrinkThumb }} style={styles.image} resizeMode="contain" />
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{strInstructions}</Text>
            </View>
            <View style={styles.ingredientsContainer}>
                <Text style={styles.subTitle}>Ingredients:</Text>
                {ingredients.map((ingredient, index) => (

                    <View key={index} style={styles.ingredientItem}>
                        <Image
                            source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png` }}
                            style={styles.ingredientImage}
                        />
                        <View style={styles.ingredientTextContainer}>
                            <Text style={styles.ingredientName}>{ingredient}</Text>
                            <Text style={styles.ingredientMeasure}>{measures[index]}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40,
    },
    titleContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#F8F8F8',
        marginTop: 20,
        marginBottom: 20,
    },
    descriptionContainer: {
        width: '80%',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    ingredientsContainer: {
        width: '80%',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#F8F8F8',
        borderRadius: 5,
        padding: 5,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    ingredientTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ingredientName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ingredientMeasure: {
        fontSize: 14,
    },
});


export default DetailsCocktail;