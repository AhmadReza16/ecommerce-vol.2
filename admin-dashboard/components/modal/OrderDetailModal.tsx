"use client";

import { Order, OrderStatus } from "@/types/order";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
}: OrderDetailModalProps) {
  if (!isOpen) return null;

  const statusColor = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return "blue";
      case "shipped":
        return "green";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Order Header */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold">#{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge color={statusColor(order.status)}>{order.status}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Customer Email</p>
            <p className="text-lg">{order.user_email || order.user}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="text-lg">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Order Items</h3>
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  {item.product ? (
                    <div className="space-y-3">
                      {/* Product Image and Basic Info */}
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center border border-gray-300">
                              <span className="text-xs text-gray-600">
                                No Image
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <p className="font-bold text-lg">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.product.description}
                          </p>

                          {/* Specifications Grid */}
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <p className="text-xs text-gray-500">
                                Unit Price
                              </p>
                              <p className="font-semibold text-indigo-600">
                                ${Number(item.product.price).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Quantity</p>
                              <p className="font-semibold">×{item.quantity}</p>
                            </div>
                            {item.product.stock !== undefined && (
                              <div>
                                <p className="text-xs text-gray-500">Stock</p>
                                <p className="font-semibold">
                                  {item.product.stock} units
                                </p>
                              </div>
                            )}
                            {item.product.category && (
                              <div>
                                <p className="text-xs text-gray-500">
                                  Category
                                </p>
                                <p className="font-semibold">
                                  {item.product.category.name}
                                </p>
                              </div>
                            )}
                            {item.product.seller && (
                              <div className="col-span-2">
                                <p className="text-xs text-gray-500">Seller</p>
                                <p className="font-semibold">
                                  {item.product.seller}
                                </p>
                              </div>
                            )}
                            {item.product.average_rating !== undefined && (
                              <div>
                                <p className="text-xs text-gray-500">Rating</p>
                                <p className="font-semibold">
                                  {typeof item.product.average_rating ===
                                  "number"
                                    ? `⭐ ${item.product.average_rating.toFixed(1)}`
                                    : "N/A"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Line Total</p>
                          <p className="text-xl font-bold text-indigo-600">
                            ${Number(item.total_price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 rounded text-yellow-800">
                      <p className="font-semibold">Product Not Found</p>
                      <p className="text-sm">
                        Quantity: {item.quantity} | Total: $
                        {Number(item.total_price).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in this order</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded p-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${order.total_price}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-6 pb-6 border-b">
          <h3 className="text-lg font-semibold mb-3">Timestamps</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Created At</p>
              <p>{new Date(order.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Updated At</p>
              <p>{new Date(order.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-indigo-600 text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
