import React, { useState, useMemo } from 'react';
import { UtensilsCrossed, Plus, ShoppingCart, Clock, Users, Zap, Shield, Target, ChefHat, BookOpen } from 'lucide-react';
import { Meal, Ingredient, NutritionInfo, GroceryList, Child } from '../../types';

export const AdvancedMealPlanner: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(new Date());
  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');
  const [showMealModal, setShowMealModal] = useState(false);
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [showNutritionPanel, setShowNutritionPanel] = useState(false);

  // Sample children data
  const children: Child[] = [
    {
      id: '1',
      name: 'Emma',
      age: 8,
      developmentalStage: 'kid',
      allergies: ['peanuts'],
      dietaryRestrictions: ['vegetarian'],
      colorTag: '#FF8C94'
    } as Child,
    {
      id: '2', 
      name: 'Liam',
      age: 6,
      developmentalStage: 'kid',
      allergies: [],
      dietaryRestrictions: [],
      colorTag: '#5AA9E6'
    } as Child
  ];

  // Age-based meal templates
  const mealTemplates = {
    baby: [
      { name: 'Pureed Sweet Potato', ageGroup: 'baby', type: 'lunch' },
      { name: 'Banana & Oat Puree', ageGroup: 'baby', type: 'breakfast' },
      { name: 'Steamed Carrot Mash', ageGroup: 'baby', type: 'dinner' }
    ],
    toddler: [
      { name: 'Mini Pancakes with Fruit', ageGroup: 'toddler', type: 'breakfast' },
      { name: 'Mac & Cheese Bites', ageGroup: 'toddler', type: 'lunch' },
      { name: 'Soft Chicken & Veggie Strips', ageGroup: 'toddler', type: 'dinner' }
    ],
    kid: [
      { name: 'Whole Grain Waffles', ageGroup: 'kid', type: 'breakfast' },
      { name: 'Turkey & Veggie Wrap', ageGroup: 'kid', type: 'lunch' },
      { name: 'Baked Salmon with Rice', ageGroup: 'kid', type: 'dinner' }
    ],
    teen: [
      { name: 'Protein Smoothie Bowl', ageGroup: 'teen', type: 'breakfast' },
      { name: 'Quinoa Power Bowl', ageGroup: 'teen', type: 'lunch' },
      { name: 'Grilled Chicken & Sweet Potato', ageGroup: 'teen', type: 'dinner' }
    ]
  };

  // Sample meals with full nutrition data
  const [meals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Whole Grain Waffles with Berries',
      type: 'breakfast',
      date: new Date('2024-08-05'),
      ingredients: [
        {
          id: '1',
          name: 'Whole grain waffle mix',
          quantity: '2',
          unit: 'cups',
          category: 'grain',
          allergens: ['gluten']
        },
        {
          id: '2',
          name: 'Mixed berries',
          quantity: '1',
          unit: 'cup',
          category: 'fruit',
          allergens: []
        },
        {
          id: '3',
          name: 'Maple syrup',
          quantity: '2',
          unit: 'tbsp',
          category: 'other',
          allergens: []
        }
      ],
      childId: 'emma',
      allergyFriendly: true,
      preferences: ['vegetarian'],
      ageGroup: 'kid',
      nutritionInfo: {
        calories: 320,
        protein: 8,
        carbs: 62,
        fat: 6,
        fiber: 8,
        sugar: 28,
        sodium: 380
      },
      recipeUrl: 'https://example.com/waffle-recipe',
      cookingTime: 15,
      servings: 2,
      parentId: 'parent1',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Turkey & Veggie Wrap',
      type: 'lunch',
      date: new Date('2024-08-05'),
      ingredients: [
        {
          id: '4',
          name: 'Whole wheat tortilla',
          quantity: '1',
          unit: 'piece',
          category: 'grain',
          allergens: ['gluten']
        },
        {
          id: '5',
          name: 'Sliced turkey',
          quantity: '3',
          unit: 'oz',
          category: 'protein',
          allergens: []
        },
        {
          id: '6',
          name: 'Lettuce',
          quantity: '1',
          unit: 'cup',
          category: 'vegetable',
          allergens: []
        },
        {
          id: '7',
          name: 'Shredded cheese',
          quantity: '2',
          unit: 'tbsp',
          category: 'dairy',
          allergens: ['dairy']
        }
      ],
      childId: 'liam',
      allergyFriendly: true,
      preferences: [],
      ageGroup: 'kid',
      nutritionInfo: {
        calories: 285,
        protein: 22,
        carbs: 28,
        fat: 8,
        fiber: 4,
        sugar: 3,
        sodium: 720
      },
      cookingTime: 5,
      servings: 1,
      parentId: 'parent1',
      createdAt: new Date()
    }
  ]);

  const [groceryList] = useState<GroceryList>({
    id: '1',
    name: 'Weekly Grocery List',
    items: [
      {
        id: '1',
        name: 'Whole grain waffle mix',
        quantity: '1 box',
        category: 'Pantry',
        purchased: false,
        mealIds: ['1']
      },
      {
        id: '2',
        name: 'Mixed berries',
        quantity: '2 containers',
        category: 'Produce',
        purchased: true,
        mealIds: ['1']
      },
      {
        id: '3',
        name: 'Whole wheat tortillas',
        quantity: '1 package',
        category: 'Bakery',
        purchased: false,
        mealIds: ['2']
      },
      {
        id: '4',
        name: 'Sliced turkey',
        quantity: '1 lb',
        category: 'Deli',
        purchased: false,
        mealIds: ['2']
      }
    ],
    parentId: 'parent1',
    completed: false,
    createdAt: new Date()
  });

  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    name: '',
    type: 'breakfast',
    date: new Date(),
    ingredients: [],
    ageGroup: 'all',
    nutritionInfo: {},
    cookingTime: 30,
    servings: 4
  });

  // Get meals for selected child and week
  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      if (selectedChild !== 'all' && meal.childId !== selectedChild) {
        return false;
      }
      
      const weekStart = new Date(activeWeek);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return meal.date >= weekStart && meal.date <= weekEnd;
    });
  }, [meals, selectedChild, activeWeek]);

  // Calculate weekly nutrition summary
  const weeklyNutrition = useMemo(() => {
    return filteredMeals.reduce(
      (total, meal) => ({
        calories: (total.calories || 0) + (meal.nutritionInfo.calories || 0),
        protein: (total.protein || 0) + (meal.nutritionInfo.protein || 0),
        carbs: (total.carbs || 0) + (meal.nutritionInfo.carbs || 0),
        fat: (total.fat || 0) + (meal.nutritionInfo.fat || 0),
        fiber: (total.fiber || 0) + (meal.nutritionInfo.fiber || 0),
        sugar: (total.sugar || 0) + (meal.nutritionInfo.sugar || 0),
        sodium: (total.sodium || 0) + (meal.nutritionInfo.sodium || 0)
      }),
      {} as NutritionInfo
    );
  }, [filteredMeals]);

  const getMealsForDay = (date: Date) => {
    return filteredMeals.filter(meal => 
      meal.date.toDateString() === date.toDateString()
    );
  };

  const generateWeekDays = () => {
    const startOfWeek = new Date(activeWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'protein': '🥩',
      'vegetable': '🥕',
      'fruit': '🍎',
      'grain': '🌾',
      'dairy': '🥛',
      'other': '🥄'
    };
    return icons[category as keyof typeof icons] || '🥄';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark">Advanced Meal Planner</h1>
          <p className="text-dark/70">Plan nutritious meals with age-appropriate suggestions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNutritionPanel(!showNutritionPanel)}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors"
          >
            <Target size={16} />
            <span>Nutrition</span>
          </button>
          <button 
            onClick={() => setShowGroceryList(true)}
            className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-xl hover:bg-white/30 transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Grocery List</span>
          </button>
          <button 
            onClick={() => setShowMealModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Child Filter */}
          <select 
            className="input-field w-40"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>

          {/* Age Group Templates */}
          <div className="flex items-center space-x-2">
            <ChefHat size={16} className="text-dark/60" />
            <span className="text-sm text-dark/70">Quick Templates:</span>
            {Object.keys(mealTemplates).map(ageGroup => (
              <button
                key={ageGroup}
                className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-xs hover:bg-accent/30 transition-colors capitalize"
              >
                {ageGroup}
              </button>
            ))}
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              const prevWeek = new Date(activeWeek);
              prevWeek.setDate(prevWeek.getDate() - 7);
              setActiveWeek(prevWeek);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            ←
          </button>
          <span className="text-lg font-semibold text-dark min-w-48 text-center">
            Week of {activeWeek.toLocaleDateString()}
          </span>
          <button 
            onClick={() => {
              const nextWeek = new Date(activeWeek);
              nextWeek.setDate(nextWeek.getDate() + 7);
              setActiveWeek(nextWeek);
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Weekly Meal Plan */}
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-semibold text-dark mb-4">Weekly Meal Plan</h2>
            
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-semibold text-dark/70 border-b border-white/20">
                  {day}
                </div>
              ))}
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-7 gap-2">
              {generateWeekDays().map((date, i) => {
                const dayMeals = getMealsForDay(date);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div 
                    key={i}
                    className={`min-h-32 p-2 rounded-lg border transition-colors ${
                      isToday ? 'border-primary/50 bg-primary/10' : 'border-white/30 bg-white/10'
                    }`}
                  >
                    <div className={`font-medium mb-2 ${isToday ? 'text-primary' : 'text-dark'}`}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {['breakfast', 'lunch', 'dinner'].map(mealType => {
                        const meal = dayMeals.find(m => m.type === mealType);
                        return (
                          <div key={mealType} className="text-xs">
                            <div className="text-dark/60 capitalize">{mealType.charAt(0)}</div>
                            {meal ? (
                              <div 
                                className="p-1 rounded text-white text-xs truncate cursor-pointer"
                                style={{ backgroundColor: children.find(c => c.id === meal.childId)?.colorTag || '#5AA9E6' }}
                                title={meal.name}
                              >
                                {meal.name}
                              </div>
                            ) : (
                              <button 
                                className="w-full p-1 border border-dashed border-gray-300 rounded text-gray-400 hover:border-primary hover:text-primary transition-colors"
                                onClick={() => {
                                  setNewMeal(prev => ({ ...prev, date, type: mealType as any }));
                                  setShowMealModal(true);
                                }}
                              >
                                +
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meal Templates */}
          <div className="card mt-6">
            <h3 className="font-semibold text-dark mb-4">Age-Appropriate Meal Ideas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(mealTemplates).map(([ageGroup, templates]) => (
                <div key={ageGroup} className="space-y-2">
                  <h4 className="font-medium text-dark capitalize">{ageGroup}</h4>
                  {templates.slice(0, 3).map((template, i) => (
                    <div key={i} className="p-2 bg-white/20 rounded-lg text-sm text-dark/80 hover:bg-white/30 cursor-pointer transition-colors">
                      {template.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrition Panel */}
        <div className="space-y-6">
          {showNutritionPanel && (
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Target size={20} className="text-primary" />
                <h3 className="font-semibold text-dark">Weekly Nutrition</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { key: 'calories', label: 'Calories', unit: 'kcal', color: '#5AA9E6' },
                  { key: 'protein', label: 'Protein', unit: 'g', color: '#FF8C94' },
                  { key: 'carbs', label: 'Carbs', unit: 'g', color: '#A4EDDA' },
                  { key: 'fat', label: 'Fat', unit: 'g', color: '#FFEC99' },
                  { key: 'fiber', label: 'Fiber', unit: 'g', color: '#9B59B6' },
                  { key: 'sodium', label: 'Sodium', unit: 'mg', color: '#E67E22' }
                ].map(nutrient => {
                  const value = weeklyNutrition[nutrient.key as keyof NutritionInfo] || 0;
                  return (
                    <div key={nutrient.key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: nutrient.color }}
                        />
                        <span className="text-sm text-dark">{nutrient.label}</span>
                      </div>
                      <span className="font-medium text-dark">
                        {Math.round(value)}{nutrient.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Allergy Alerts */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Shield size={20} className="text-red-500" />
              <h3 className="font-semibold text-dark">Allergy Alerts</h3>
            </div>
            
            <div className="space-y-2">
              {children.map(child => (
                <div key={child.id} className="p-3 bg-white/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: child.colorTag }}
                    />
                    <span className="font-medium text-dark">{child.name}</span>
                  </div>
                  {child.allergies && child.allergies.length > 0 ? (
                    <div className="space-y-1">
                      {child.allergies.map(allergy => (
                        <span key={allergy} className="inline-block px-2 py-1 bg-red-100 text-red-600 rounded text-xs mr-1">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-dark/60">No known allergies</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <BookOpen size={16} className="text-primary" />
                  <span className="text-sm text-dark">Recipe Suggestions</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Zap size={16} className="text-warning" />
                  <span className="text-sm text-dark">Quick Meals (15 min)</span>
                </div>
              </button>
              <button className="w-full p-3 text-left bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-accent" />
                  <span className="text-sm text-dark">Family Meal Ideas</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grocery List Modal */}
      {showGroceryList && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingCart size={24} className="text-primary" />
                  <h2 className="text-xl font-bold text-dark">Smart Grocery List</h2>
                </div>
                <button 
                  onClick={() => setShowGroceryList(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-dark/70">
                  {groceryList.items.filter(item => item.purchased).length} of {groceryList.items.length} items purchased
                </span>
                <button className="btn-secondary text-sm">Auto-Generate from Meals</button>
              </div>

              {/* Group by category */}
              {['Produce', 'Pantry', 'Dairy', 'Deli', 'Bakery'].map(category => {
                const categoryItems = groceryList.items.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category} className="mb-6">
                    <h3 className="font-semibold text-dark mb-3 flex items-center space-x-2">
                      <span>{getCategoryIcon(category.toLowerCase())}</span>
                      <span>{category}</span>
                    </h3>
                    <div className="space-y-2">
                      {categoryItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/20 rounded-lg">
                          <input
                            type="checkbox"
                            checked={item.purchased}
                            className="rounded border-gray-300"
                            readOnly
                          />
                          <div className="flex-1">
                            <span className={`text-dark ${item.purchased ? 'line-through opacity-60' : ''}`}>
                              {item.name}
                            </span>
                            <div className="text-xs text-dark/60">{item.quantity}</div>
                          </div>
                          {item.mealIds.length > 0 && (
                            <div className="flex space-x-1">
                              {item.mealIds.map(mealId => {
                                const meal = meals.find(m => m.id === mealId);
                                const child = children.find(c => c.id === meal?.childId);
                                return (
                                  <div 
                                    key={mealId}
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: child?.colorTag || '#5AA9E6' }}
                                    title={meal?.name}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
              <button className="btn-secondary">Share List</button>
              <button className="btn-primary">Mark All Purchased</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Meal Modal */}
      {showMealModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark">Add New Meal</h2>
                <button 
                  onClick={() => setShowMealModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Meal Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Grilled Chicken Salad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Meal Type</label>
                  <select
                    className="input-field"
                    value={newMeal.type}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Age Group</label>
                  <select
                    className="input-field"
                    value={newMeal.ageGroup}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, ageGroup: e.target.value as any }))}
                  >
                    <option value="all">All Ages</option>
                    <option value="baby">Baby (0-12 months)</option>
                    <option value="toddler">Toddler (1-3 years)</option>
                    <option value="kid">Kid (4-12 years)</option>
                    <option value="teen">Teen (13+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={newMeal.date?.toISOString().split('T')[0]}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, date: new Date(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Cooking Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Cooking Time (minutes)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newMeal.cookingTime}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, cookingTime: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Servings</label>
                  <input
                    type="number"
                    className="input-field"
                    value={newMeal.servings}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Nutrition Info */}
              <div>
                <h3 className="font-semibold text-dark mb-3">Nutrition Information (per serving)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { key: 'calories', label: 'Calories', unit: 'kcal' },
                    { key: 'protein', label: 'Protein', unit: 'g' },
                    { key: 'carbs', label: 'Carbs', unit: 'g' },
                    { key: 'fat', label: 'Fat', unit: 'g' },
                    { key: 'fiber', label: 'Fiber', unit: 'g' },
                    { key: 'sodium', label: 'Sodium', unit: 'mg' }
                  ].map(nutrient => (
                    <div key={nutrient.key}>
                      <label className="block text-sm font-medium text-dark mb-1">
                        {nutrient.label} ({nutrient.unit})
                      </label>
                      <input
                        type="number"
                        className="input-field"
                        value={newMeal.nutritionInfo?.[nutrient.key as keyof NutritionInfo] || ''}
                        onChange={(e) => setNewMeal(prev => ({ 
                          ...prev, 
                          nutritionInfo: { 
                            ...prev.nutritionInfo, 
                            [nutrient.key]: parseFloat(e.target.value) || 0 
                          }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-dark">Ingredients</h3>
                  <button className="btn-secondary text-sm">Add Ingredient</button>
                </div>
                <div className="space-y-2">
                  {newMeal.ingredients?.map((ingredient, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 p-3 bg-white/20 rounded-lg">
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                      />
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Quantity"
                        value={ingredient.quantity}
                      />
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Unit"
                        value={ingredient.unit}
                      />
                      <select className="input-field" value={ingredient.category}>
                        <option value="protein">Protein</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="grain">Grain</option>
                        <option value="dairy">Dairy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
              <button 
                onClick={() => setShowMealModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="btn-primary">
                Add Meal & Generate Grocery Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};