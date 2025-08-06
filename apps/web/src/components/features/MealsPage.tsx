import React from 'react';
import { UtensilsCrossed, Plus, ShoppingCart } from 'lucide-react';

export const MealsPage: React.FC = () => {
  const meals = [
    { id: '1', name: 'Pancakes with berries', type: 'breakfast', date: 'Today', ingredients: ['Flour', 'Eggs', 'Milk', 'Berries'] },
    { id: '2', name: 'Chicken Caesar Salad', type: 'lunch', date: 'Today', ingredients: ['Chicken', 'Lettuce', 'Parmesan', 'Croutons'] },
    { id: '3', name: 'Spaghetti Bolognese', type: 'dinner', date: 'Today', ingredients: ['Pasta', 'Ground beef', 'Tomato sauce', 'Onions'] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">Meal Planner</h1>
          <p className="text-dark/70 dark:text-gray-300">Plan healthy meals for your family</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors">
            <ShoppingCart size={16} />
            <span>Grocery List</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Meal Plan Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {['breakfast', 'lunch', 'dinner'].map(mealType => {
          const meal = meals.find(m => m.type === mealType);
          return (
            <div key={mealType} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark dark:text-white capitalize">{mealType}</h3>
                <UtensilsCrossed size={20} className="text-primary" />
              </div>
              {meal ? (
                <div>
                  <h4 className="font-medium text-dark dark:text-white mb-2">{meal.name}</h4>
                  <div className="space-y-1">
                    {meal.ingredients.map((ingredient, i) => (
                      <span key={i} className="inline-block bg-white/20 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-dark/60 dark:text-gray-400">
                  <p>No meal planned</p>
                  <button className="mt-2 text-primary hover:underline">Add meal</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-dark dark:text-white mb-4">This Week's Meals</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="p-3 bg-white/20 rounded-lg">
              <h4 className="font-medium text-dark dark:text-white mb-2">{day}</h4>
              <div className="space-y-1 text-xs text-dark/70 dark:text-gray-300">
                <div>Breakfast planned</div>
                <div>Lunch planned</div>
                <div>Dinner planned</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};